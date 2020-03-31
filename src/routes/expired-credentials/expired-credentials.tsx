import * as React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;

type ExpiredCredentialsProps = {
  onValuesChange?(props, values, allVals): any;
  error?: any;
  errorMessage?: React.ReactNode;
  onSubmit?(vals: any): any;
  onGetPasswordPolicy?(): any;
  loginLoading?: boolean;
  history?: any;
  passwordPolicy?: any;
} & FormComponentProps;

type ISymbols = {
  numbers: number;
  upper: number;
  lower: number;
  special: number;
};

type ExpiredCredentialsState = {
  passwordType: string;
  newPasswordType: string;
  secondNewPasswordType: string;
};

export class ExpiredCredentialsComponent extends React.Component<ExpiredCredentialsProps, ExpiredCredentialsState> {
  constructor(props) {
    super(props);

    this.state = {
      passwordType: 'password',
      newPasswordType: 'password',
      secondNewPasswordType: 'password',
    };
  }

  componentDidMount() {
    this.props.onGetPasswordPolicy();
  }

  public handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  public validateToFirstNewPassword = (rule, value, callback) => {
    const { form, passwordPolicy } = this.props;
    const symbols = value?.split('').reduce((acc: ISymbols, str: string): ISymbols => this.getCheckedPasswordSymbol(acc, str.charCodeAt(0)), {
      numbers: 0,
      upper: 0,
      lower: 0,
      special: 0,
    });
    const diffCondition = value
      ? (
        value !== form.getFieldValue('password')
        && value < passwordPolicy.minChangedPasswordChars
      )
      : false;

    if (value && value === form.getFieldValue('password')) {
      callback('Новый пароль не должен совпадать со старым.');
    }
    if (value && value.length > 0 && value.length < passwordPolicy.minLength) {
      callback(`Длина пароля должна быть минимум ${passwordPolicy.minLength} символов`);
    } else if (value && value.length > 0 && diffCondition) {
      callback(`Новый пароль должен содержать ${passwordPolicy.minChangedPasswordChars} новых символов`);
    } else if (value && value.length > 0 && !diffCondition) {
      const symbolsCondition = this.validatePasswordSymbols(symbols);

      if (!symbolsCondition) {
        callback(this.createMessagePasswordPolicy(passwordPolicy, symbols));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  public validateToSecondNewPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('firstNewPassword')) {
      callback('Значения не совпадают');
    } else {
      callback();
    }
  };

  /**
   * Формирование строки неудачной валидации пароля
   *
   */
  private createMessagePasswordPolicy = ({ minLower, minUpper, minNumbers, minSpecial }, currentPasswordSymbols) => {
    const messageList: string[] = [];

    if (minLower && (minLower > currentPasswordSymbols.lower)) {
      messageList.push(`строчные ${minLower} симв`);
    }
    if (minUpper && (minUpper > currentPasswordSymbols.upper)) {
      messageList.push(`прописные ${minUpper} симв`);
    }
    if (minNumbers && (minNumbers > currentPasswordSymbols.numbers)) {
      messageList.push(`числа ${minNumbers} симв`);
    }
    if (minSpecial && (minSpecial > currentPasswordSymbols.special)) {
      messageList.push(`спец. ${minSpecial} симв`);
    }

    return `Поле должно содержать: ${messageList.join(', ')}`;
  };

  /**
   * Валидация символов пароля
   *
   */
  private validatePasswordSymbols = (symbols): boolean => {
    const { passwordPolicy } = this.props;
    const {
      id,
      name,
      ...otherPasswordPolicy
    } = passwordPolicy;

    for (const key in otherPasswordPolicy) {
      const symbolKey: string = key.slice(3).toLowerCase();
      if (passwordPolicy[key] > symbols[symbolKey]) {
        return false;
      }
    }

    return true;
  };

  private getCheckedPasswordSymbol = (symbols: ISymbols, code: number): ISymbols => {
    if (code >= 48 && code <= 57) {
      symbols.numbers += 1;
    } else if (code >= 65 && code <= 90) {
      symbols.upper += 1;
    } else if (code >= 97 && code <= 122) {
      symbols.lower += 1;
    } else if (code >= 33 && code <= 126) {
      symbols.special += 1;
    }

    return symbols;
  };

  public handleCancel = () => this.props.history.push('/login');

  /**
   * Обработчик клика по вложенному суффиксу поля ввода
   *
   */
  public createInputSuffix = (typeName): JSX.Element => (
    <IconStyled
      theme={this.state[typeName] === 'password' ? 'filled' : ''}
      type="eye"
      onClick={this.handleClickByPasswordInputSuffix(typeName)}
    />
  );

  /**
   * Обработчик клика по вложенному суффиксу поля ввода
   *
   */
  public handleClickByPasswordInputSuffix = (typeName) => (): void => {
    this.setState((prevState: ExpiredCredentialsState) => ({
      ...prevState,
      [typeName]: prevState[typeName] === 'password' ? 'text' : 'password',
    }));
  };

  render() {
    const { passwordType, newPasswordType, secondNewPasswordType } = this.state;
    const { loginLoading, errorMessage } = this.props;
    const expiredLogin = this.props.error?.login;
    const { getFieldDecorator } = this.props.form;

    return (
      <ComponentWrap>
        <FormContainer>
          <StyledForm
            onSubmit={this.handleSubmit}
          >
            <LogoWrap>
              <ImgStyled />
            </LogoWrap>

            <TitleStyled>
              {'Обновление пароля'}
            </TitleStyled>

            {/* LOGIN */}
            <FormItem style={{ padding: '0 8px 0 8px' }}>
              {getFieldDecorator('login', {
                initialValue: expiredLogin,
                rules: [{ required: true, message: 'введите логин' }],
              })(
                <InputStyled placeholder="Логин" />,
              )}
            </FormItem>
            {/* /LOGIN */}

            {/* PASSWORD */}
            <FormItem style={{ padding: '0 8px 0 8px' }}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'введите пароль' }],
              })(
                <InputStyled type={passwordType} placeholder="Пароль" suffix={this.createInputSuffix('passwordType')} />,
              )}
            </FormItem>
            {/* /PASSWORD */}

            {/* FIRST NEW PASSWORD */}
            <FormItem style={{ padding: '0 8px 0 8px' }}>
              {getFieldDecorator('firstNewPassword', {
                rules: [
                  {
                    required: true,
                    message: 'введите новый пароль',
                  }, {
                    validator: this.validateToFirstNewPassword,
                  },
                ],
              })(
                <InputStyled type={newPasswordType} placeholder="Новый пароль" suffix={this.createInputSuffix('newPasswordType')} />,
              )}
            </FormItem>
            {/* /FIRST NEW PASSWORD */}

            {/* SECOND NEW PASSWORD */}
            <FormItem style={{ padding: '0 8px 0 8px' }}>
              {getFieldDecorator('secondNewPassword', {
                rules: [
                  {
                    required: true,
                    message: 'подтвердите пароль',
                  }, {
                    validator: this.validateToSecondNewPassword,
                  },
                ],
              })(
                <InputStyled type={secondNewPasswordType} placeholder="Подтвердить пароль" suffix={this.createInputSuffix('secondNewPasswordType')} />,
              )}
            </FormItem>
            {/* /SECOND NEW PASSWORD */}

            {/* CONTROL BUTTON */}
            <FormItem style={{ marginTop: '15px' }}>
              <ButtonStyled loading={loginLoading} htmlType="submit" className="login-form-button">
                {'Обновить пароль'}
              </ButtonStyled>
            </FormItem>

            <FormItem>
              <ButtonStyled onClick={this.handleCancel} className="login-form-button">
                {'Отмена'}
              </ButtonStyled>
            </FormItem>
            {/* /CONTROL BUTTON */}

            {/* ERRORS */}
            {
              errorMessage && (
                <FormItem style={{ textAlign: 'center' }}>
                  <div className="ant-form-explain" style={{ color: '#f5222d' }}>{errorMessage}</div>
                </FormItem>
              )

            }
            {/* ERRORS */}
            <Support>
              <FooterTextStyled>
                <span>Техподдержка: </span>
                <a
                  href="mailto:helpdesk-monitor@mos.ru"
                >
                  {'helpdesk-monitor@mos.ru'}
                </a>
              </FooterTextStyled>
            </Support>
          </StyledForm>
        </FormContainer>
      </ComponentWrap>
    );
  }
}

export const ExpiredCredentialsForm = Form.create<ExpiredCredentialsProps>({
  onValuesChange: (props, changedValues, allvals) => {
    if (props.onValuesChange) {
      props.onValuesChange(props, changedValues, allvals);
    }
  },
})(ExpiredCredentialsComponent);

export const setBackground = (url) => () => `
    background-image: url(${url});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const LogoWrap = styled.div`
  position: absolute;
  width: 100%;
`;

export const ComponentWrap = styled(Container)`
  ${setBackground('static/login-background.png')};
`;

export const LogoStyled = styled.div`
  text-align: center;
  width: 29.5px;
  height: 52px;
  object-fit: contain;
  margin: -15px auto 0;
`;

export const ImgStyled = styled(LogoStyled)`
  ${setBackground('static/login-logo.png')};
`;

const FormContainer = styled.div`
    font-family: Tahoma, Geneva, sans-serif;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: auto;
`;

const StyledForm = styled(Form as any)`
    position: relative;
    width: 260px;
    box-shadow: 0 2.5px 12.5px 0 rgba(0, 0, 0, 0.25);
    border: solid 0.5px #bac5cc;
    background-color: #ffffff;
    padding-bottom: 45px;

    input {
      text-align: center;
    }

    .ant-input-affix-wrapper .ant-input:not(:last-child) {
      padding: 0;
    }

    .ant-form-item {
      margin-bottom: 10px;
    }

    .ant-form-explain {
      line-height: 1;
    }

    .ant-btn {
      border: solid 0.5px #ffffff;
      background-color: #e30518;
      font-family: Roboto;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #ffffff;

      &:hover {
        border: solid 0.5px #ffffff;
        background-color: #CF1912;
        color: #ffffff;
      }
  }

`;

export const TitleStyled = styled.div`
  height: 26px;
  text-transform: uppercase;
  width: 100%;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: center;
  color: #504d4b;
  margin: 48px 0 11px 0;
`;

export const InputStyled = styled(Input as any)`
  max-width: 200px;
  text-align: center;
`;

export const ButtonStyled = styled(Button as any)`
  width: 200px;
  text-transform: uppercase;
  text-align: center;
`;

const Support = styled.div`
  width: 100%;
  height: 30px;
  border-top: solid 0.5px #bac5cc;
  background-color: #ffffff;
`;

export const FooterTextStyled = styled.div`
  width: 100%;
  height: 100%;
  font-family: Roboto;
  font-size: 9px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #504d4b;
  margin-top: 9px;
`;
export const IconStyled = styled(Icon)`
  cursor: pointer;
`;
