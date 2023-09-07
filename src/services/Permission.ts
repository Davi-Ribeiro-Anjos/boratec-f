import jwt_decode from 'jwt-decode';
import { getCookie } from './Cookies';

const access: any = jwt_decode(getCookie("token_access") || "")

const me = access.employee

const getPermissions = (me: any) => {
    let listPermission: string[] = []

    if (me) {
        for (const key in me.groups) {
            if (Object.prototype.hasOwnProperty.call(me.groups, key)) {
                const permission = me.groups[key];
                listPermission.push(permission.name)
            }
        }
    }

    return listPermission
}

export const myPermissions = getPermissions

export const verifyPermission = (name: string): boolean => {
    return (myPermissions.includes(name) || me.is_staff || me.is_superuser)
}