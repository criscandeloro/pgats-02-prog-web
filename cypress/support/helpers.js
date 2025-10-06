


export function getRandomNumber() {
    return new Date().getTime();
}

export function getRandomEmail(){
    return `qa-tester-${getRandomNumber()}@teste.com`
}

export function getRandomBirthDate() {
    const birthDate = faker.date.birthdate({ min: 18, max: 80, mode: 'age' })
    return {
        day: birthDate.getDate().toString(),
        month: birthDate.toLocaleString('en-US', { month: 'long' }),
        year: birthDate.getFullYear().toString()
    }
}