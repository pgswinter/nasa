/* eslint-disable no-useless-escape */
export const textareaErrorTex = 'Text need longer than 3 character' 
export const textareaRegex = /^.{3,}$/
export const linkErrorText = 'Url need [http(s)://] string. Url params is not allow special character. Except # ?. Params value need = character';
export const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;