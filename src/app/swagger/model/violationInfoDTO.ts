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

/**
 * Данные о нарушении
 */
export type ViolationInfoDTO = { 
    /**
     * Признак критичности нарушения
     */
    critical?: boolean;
    /**
     * Дата и время когда перестает отображатся нарушение
     */
    dateClose?: Date;
    /**
     * Элемент - 1
     */
    element1?: string;
    /**
     * Элемент - 2
     */
    element2?: string;
    /**
     * Дата фиксации нарушения
     */
    fixationDate?: Date;
    /**
     * Флаг присутствия фото/видео
     */
    hasPhotoVideo?: boolean;
    /**
     * Идентификатор
     */
    id?: string;
    /**
     * Идентификатор системы
     */
    idSystem?: string;
    /**
     * Имя системы
     */
    idSystemName?: string;
    /**
     * Широта
     */
    latitude?: number;
    /**
     * Долгота
     */
    longitude?: number;
    /**
     * Сезон
     */
    season?: string;
    /**
     * группа системы
     */
    systemGroup?: string;
    /**
     * Признак систематичности нарушения
     */
    systematic?: boolean;
    /**
     * Текст нарушения
     */
    text?: string;
    /**
     * Номер тикета
     */
    ticket?: string;
    /**
     * Тип нарушения
     */
    violationType?: string;
};