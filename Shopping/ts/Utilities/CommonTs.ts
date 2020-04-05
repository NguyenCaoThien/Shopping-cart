export class CommonTs{
    public static isUndefined(obj){
        return (obj === "" || (typeof(obj) === 'object' && obj == null));
    }

    public static validateInputValueTextbox(inputValue){
        var validCharacter = /[1-9]/g;
        return validCharacter.test(inputValue) && inputValue > 0 && isFinite(inputValue);
    }
}