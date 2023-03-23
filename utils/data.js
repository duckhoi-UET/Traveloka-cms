export function mapDataFromOptions(options, key, value) {
    const pairs = {};

    options.forEach((item) => {
        pairs[item[key]] = item[value];
    });

    return pairs;
}
