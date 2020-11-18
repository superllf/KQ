export function nativeGoBack(type, data) {
    if (type == "3") window.AndroidMethod.nativeGoBack();
    else if (type == "4") {
        location = "iOSMethod://" + JSON.stringify({
            method: "nativeGoBack",
            params: JSON.stringify({})
        });
    }
    else if (type == "5") history.go(-1);
}

