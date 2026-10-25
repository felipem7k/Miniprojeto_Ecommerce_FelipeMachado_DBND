export const sanitizar = (texto: string) => texto.toLowerCase().trim();

export const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const verificarNome = (nome: string): boolean => sanitizar(nome).length >= 3;