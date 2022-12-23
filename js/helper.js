function validateInputValues(valuesObject) {
    const {
        name,
        age,
        email,
        password,
        phone,
        card,
    } = valuesObject

    const namePattern = /^[A-Za-z.\s_-]{3,20}$/;
    const validName = namePattern.test(name);

    const numbersPattern = /^\d+$/;
    const validAge = numbersPattern.test(age);

    const validPhoneNumber = numbersPattern.test(phone);

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validEmail = emailPattern.test(email);

    const passwordPattern = /^[a-zA-Z0-9]{8,}$/;
    const validPassword = passwordPattern.test(password);

    const cardPattern = /0*[1-9]\d{15,}/;
    const validCardNumber = cardPattern.test(card);

    return {
        name: validName,
        age: validAge,
        email: validEmail,
        password: validPassword,
        phone: validPhoneNumber,
        card: validCardNumber
    }

}
