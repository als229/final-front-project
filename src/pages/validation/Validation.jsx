export const userIdRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;

export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)\S{6,30}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const nicknameRegex = /^([a-zA-Z0-9]{2,30}|[\uAC00-\uD7A3]{2,5})$/;

export const realNameRegex = /^([a-zA-Z]{2,30}|[\uAC00-\uD7A3]{2,5})$/;

export const codeRegex = /^\d{6}$/;
