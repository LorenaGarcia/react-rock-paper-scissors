function optionApi(option) {
    let userOption = option.toUpperCase();
    return fetch(`https://smartplay.afiniti.com/v1/play/${userOption}`);
}

export default optionApi;

