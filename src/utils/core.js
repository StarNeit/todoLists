export const sortedArray = (array) => {
    return array.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}
