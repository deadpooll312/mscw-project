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
 * Данные с ссылками на потоки видео
 */
export type EchdStreamDataDTO = { 
    /**
     * Время до которого будет работать ссылка на поток
     */
    expired?: Date;
    /**
     * Ссылка на управление live потоком видео с ЕЦХД
     */
    urlControlStreamLive?: string;
    /**
     * Массив ссылок на управление live потоком видео с ЕЦХД
     */
    urlControlStreamLiveList?: string[];
    /**
     * Ссылка на архивный поток видео с ЕЦХД
     */
    urlStreamArchive?: string;
    /**
     * Ссылка на управление android архивным потоком видео с ЕЦХД
     */
    urlStreamArchiveAndroid?: string;
    /**
     * Массив ссылок на управление android архивным потоком видео с ЕЦХД
     */
    urlStreamArchiveAndroidList?: string[];
    /**
     * Ссылка на управление IOS архивным потоком видео с ЕЦХД
     */
    urlStreamArchiveIOS?: string;
    /**
     * Массив ссылок на управление IOS архивным потоком видео с ЕЦХД
     */
    urlStreamArchiveIOSList?: string[];
    /**
     * Массив ссылок на архивный поток видео с ЕЦХД
     */
    urlStreamArchiveList?: string[];
    /**
     * Ссылка на live поток видео с ЕЦХД
     */
    urlStreamLive?: string;
    /**
     * Ссылка на управление android live потоком видео с ЕЦХД
     */
    urlStreamLiveAndroid?: string;
    /**
     * Массив ссылок на android live поток видео с ЕЦХД
     */
    urlStreamLiveAndroidList?: string[];
    /**
     * Ссылка на управление IOS live потоком видео с ЕЦХД
     */
    urlStreamLiveIOS?: string;
    /**
     * Массив ссылок на IOS live поток видео с ЕЦХД
     */
    urlStreamLiveIOSList?: string[];
    /**
     * Массив ссылок на live поток видео с ЕЦХД
     */
    urlStreamLiveList?: string[];
};