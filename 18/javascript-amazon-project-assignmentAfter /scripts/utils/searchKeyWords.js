// .includes()忽略大小写模式 → 返回true\false
export function includesIgnoreCase(str_1, str_2) {
    // 检查str_1,str_2是不是字符串
    if (str_1.toLowerCase().includes(str_2.toLowerCase())) {
        console.log(str_2, " match with", str_1, "in string/string mode");
        return true;
    }
    return false;
}

export function includesKeywords(array_1, str_2) {
    // console.log('keywords match run: ',array_1,str_2);
    // 如果str_1是list
        for(const word of array_1){
        if (includesIgnoreCase(word,str_2)) {
            console.log('!!! keyword match',str_2, " match with", array_1, " in array/string mode");
            return true;
        }
    }
    return false;
}
