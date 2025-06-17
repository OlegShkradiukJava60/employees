export default function getAge(birthDate: string): number {
    const now = new Date();
    const born = new Date(birthDate);

    let age = now.getFullYear() - born.getFullYear();

    const hasBirthdayPassedThisYear =
        now.getMonth() > born.getMonth() ||
        (now.getMonth() === born.getMonth() && now.getDate() >= born.getDate());

    if (!hasBirthdayPassedThisYear) {
        age--;
    }

    return age;
}
