import * as React from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/lib/form';
import { lighten, darken } from 'polished';
import { ThemedStyledProps } from 'styles';

const FormItem = Form.Item;

type LoginProps = {
  onValuesChange?(props, values, allVals): any;
  errorMessage?: React.ReactNode;
  onSubmit?(vals: any): any;
  loginLoading?: boolean;
} & FormComponentProps;

type LoginState = {
  type: string;
};

class LoginPageForm extends React.Component<LoginProps, LoginState> {
  constructor(props) {
    super(props);

    this.state = {
      type: 'password',
    };
  }

  public handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  /**
   * Обработчик клика по вложенному суффиксу поля ввода
   *
   */
  public createInputSuffix = (): JSX.Element => {
    const { type } = this.state;

    return (
      <IconStyled
        theme={type === 'password' ? 'filled' : ''}
        type="eye"
        onClick={this.handleClickByPasswordInputSuffix}
      />
    );
  };

  /**
   * Обработчик клика по вложенному суффиксу поля ввода
   *
   */
  public handleClickByPasswordInputSuffix = (): void => {
    this.setState((prevState: LoginState) => ({
      type: prevState.type === 'password' ? 'text' : 'password',
    }));
  };

  render() {
    const { type } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { loginLoading, errorMessage } = this.props;
    const suffix = this.createInputSuffix();

    return (
      <LoginWrap>
        <FormContainer>
          <StyledForm onSubmit={this.handleSubmit}>
            <LogoWrap>
              <ImgStyled />
            </LogoWrap>

            <TitleStyled>
              <Title>
                Мониторинг
                <br />
                {' '}
                чистоты
                <br />
                {' '}
                города
              </Title>
            </TitleStyled>

            {/* Пока под вопросом будет ли */}
            {/* <LinkWrapStyled>
              <LinkStyled to={`/update-credentials`}>{'Сменить пароль'}</LinkStyled>
            </LinkWrapStyled> */}

            <FormItem>
              {getFieldDecorator('login', {
                rules: [{ required: true, message: 'введите имя пользователя' }],
                initialValue: global.defaultLogin,
              })(
                <InputStyled placeholder="Логин" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'введите пароль' }],
                initialValue: global.defaultLoginPass,
              })(
                <InputStyled type={type} placeholder="Пароль" suffix={suffix} />,
              )}
            </FormItem>
            <FormItem style={{ marginTop: '40px' }}>
              <ButtonStyled loading={loginLoading} style={{ height: '40px', width: '200px' }} htmlType="submit" className="login-form-button">
                {'Войти'}
              </ButtonStyled>
            </FormItem>

            {
              errorMessage && (
                <Errors>
                  <div className="ant-form-explain" style={{ color: '#f5222d' }}>
                    {errorMessage}
                  </div>
                </Errors>
              )
            }

            <Support>
              <FooterTextStyled>
                <a
                  href="mailto:helpdesk-monitor@mos.ru"
                >
                  {'Техническая поддержка'}
                </a>
              </FooterTextStyled>
            </Support>
          </StyledForm>
        </FormContainer>
      </LoginWrap>
    );
  }
}

export default Form.create<LoginProps>({
  onValuesChange: (props, changedValues, allvals) => {
    if (props.onValuesChange) {
      props.onValuesChange(props, changedValues, allvals);
    }
  },
})(LoginPageForm);

const setBackground = (url) => () => `
    background-image: url(${url});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LogoWrap = styled.div`
  position: absolute;
  width: 100%;
`;

const LoginWrap = styled(LoginContainer)`
  ${setBackground('static/login-background-winter.png')};
`;

const LogoStyled = styled.div`
  text-align: center;
  width: 50px;
  height: 60px;
  object-fit: contain;
  margin-top: 50px;
  margin-left: 73px;
`;

const ImgStyled = styled(LogoStyled)`
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

    transition: transform 0.1s;
`;

const StyledForm = styled(Form as any)`
    position: relative;
    width: 300px;
    min-height: 430px;
    box-shadow: 0 2.5px 12.5px 0 rgba(0, 0, 0, 0.25);
    border: solid 0.5px #bac5cc;
    background-color: #ffffff;
    border-radius: 6px;
    /* padding-bottom: 45px; */

   input {
      height: 40px;
   }

    #login{
      margin-top: 75px;
      padding-left: 20px;
    }

    #password{
      padding-left: 20px;
    }

    .ant-input{
      border: solid 1px #dee2e8;
    }

    .ant-input-affix-wrapper .ant-input:not(:last-child) {
      padding: 0;
    }

    .ant-form-item {
      margin-bottom: 20px;
    }

    .ant-form-explain {
      line-height: 1;
    }

    .ant-btn {
      border: solid 0.5px #ffffff;
      background-color: #746a8f;
      font-family: Oswald-Medium;
      font-size: 13px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      text-align: center;
      color: #ffffff;
      line-height: 1.43;
      letter-spacing: 0.2px;

      &:hover, &:focus {
        border: solid 0.5px #ffffff;
        background-color: #8f86a6;
        color: #ffffff;
      }
  }

  .ant-input-suffix {
    color: #818490 !important;
    opacity: 0.5;
  }

`;

const TitleStyled = styled.div`
  position: relative;
  left: 142px;
  top: 50px;
`;

const Title = styled.p`
  text-align: left;
  color: #2a2a2c;
  font-family: Oswald-Medium;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.2;
  letter-spacing: 0.18px;
`;

const InputStyled = styled(Input as any)`
  max-width: 200px;
`;

const ButtonStyled = styled(Button as any)`
  width: 180.5px;
  text-transform: uppercase;
  text-align: center;
  color: ${(props) => props.theme.colors.palette.white1 };
  background-color: ${(props) =>  props.theme.colors.palette.blue5 };

  &&&:hover{
    background-color: ${(props) => lighten(0.1, props.theme.colors.palette.blue5 )};

    transform: scale(1.05, 1.05);
  }
`;

const Support = styled.div`
  width: 100%;
`;

const FooterTextStyled = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;
  top: 377px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: center;

  opacity: 0.8;
  font-family: OpenSans;
  font-size: 12px;
  font-weight: 600;
   a{
     color: ${({theme}: ThemedStyledProps<{}>) => theme.colors.palette.blue5};
     text-decoration: underline;
        &:hover {
        color: ${(props) => darken(0.2, props.theme.colors.palette.blue5 )};
        text-decoration: underline;
      }
   }
`;

const IconStyled = styled(Icon)`
  cursor: pointer;
`;

const Errors = styled(Form.Item)`
  margin-bottom: 30px;
` as React.FunctionComponent<FormItemProps>;
