/* tslint:disable */
/* eslint-disable */
/**
 * Doctors API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Doctor } from './Doctor';
import {
    DoctorFromJSON,
    DoctorFromJSONTyped,
    DoctorToJSON,
} from './Doctor';

/**
 * 
 * @export
 * @interface ApiDoctorsGet200Response
 */
export interface ApiDoctorsGet200Response {
    /**
     * 
     * @type {number}
     * @memberof ApiDoctorsGet200Response
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiDoctorsGet200Response
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiDoctorsGet200Response
     */
    total?: number;
    /**
     * 
     * @type {Array<Doctor>}
     * @memberof ApiDoctorsGet200Response
     */
    results?: Array<Doctor>;
}

/**
 * Check if a given object implements the ApiDoctorsGet200Response interface.
 */
export function instanceOfApiDoctorsGet200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ApiDoctorsGet200ResponseFromJSON(json: any): ApiDoctorsGet200Response {
    return ApiDoctorsGet200ResponseFromJSONTyped(json, false);
}

export function ApiDoctorsGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiDoctorsGet200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'limit': !exists(json, 'limit') ? undefined : json['limit'],
        'total': !exists(json, 'total') ? undefined : json['total'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(DoctorFromJSON)),
    };
}

export function ApiDoctorsGet200ResponseToJSON(value?: ApiDoctorsGet200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'limit': value.limit,
        'total': value.total,
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(DoctorToJSON)),
    };
}
