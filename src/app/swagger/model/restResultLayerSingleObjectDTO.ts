/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { LayerSingleObjectDTO } from './layerSingleObjectDTO';

export type RestResultLayerSingleObjectDTO = { 
    code?: RestResultLayerSingleObjectDTO.CodeEnum;
    data?: LayerSingleObjectDTO;
    errorCode?: number;
    requestId?: string;
    responseId?: string;
    stackTrace?: string;
    synopsis?: string;
};
export namespace RestResultLayerSingleObjectDTO {
    export type CodeEnum = 'SUCCESS' | 'ERROR';
    export const CodeEnum = {
      SUCCESS: 'SUCCESS' as CodeEnum,
      ERROR: 'ERROR' as CodeEnum
    };
}