function isBracesOpen(ch){
    return ch=='(' || ch=='{' || ch=='[';
}
function isBracesClosed(ch){
    return ch==')' || ch=='}' || ch==']';
}
function precidence(ch){
    switch (ch) {
        case '+':
            return 1;
        case '-':
            return 1;
        case '*':
            return 2;
        case '/':
            return 2;
        case '^':
            return 3;
    }
    return 0;
}
function postfix(inf_arr){
    let p_arr=[];
    let stack=[];
    let top=-1;
    let test='';
    for (let i = 0; i < inf_arr.length; i++) {
        if(typeof(inf_arr[i])==='number')
        p_arr.push(inf_arr[i]);
        else{
            if(isBracesOpen(inf_arr[i])){
                stack.push(inf_arr[i])
                top++;
            }
            else if(isBracesClosed(inf_arr[i])){
                if(inf_arr[i]==')')
                test='(';
                else if(inf_arr[i]=='}')
                test='{';
                else
                test='[';
                while(stack.length!=0 && stack[top]!=test){
                    p_arr.push(stack.pop());
                    top--;
                }
                stack.pop();
                top--;
            }
            else{
                if(stack.length==0 || precidence(inf_arr[i])>precidence(stack[top])){
                    top++;
                    stack.push(inf_arr[i]);
                }
                else{
                    p_arr.push(stack.pop());
                    top--;
                    i--;
                }
            }
        }
    }
    while(stack.length!=0){
        p_arr.push(stack.pop());
    }
    return p_arr;
}
function isDigit(ch){
    return ch>='0' && ch<='9';
}
function break_into_tokens(exp){
    let number="";
    let arr=[];
    for (let i = 0; i < exp.length; i++) {
        if(isDigit(exp[i]) || (number.indexOf('.')==-1 && exp[i]=='.' && isDigit(exp[i-1]) && isDigit(exp[i+1])))
        number+=exp[i];
        else{
            if(number!==""){
                arr.push(Number(number));
                number="";
            }
            arr.push(exp[i]);
        }
    }
    if(number!=="")
    arr.push(Number(number));
    return arr;
}
function operate(var1,operator,var2){
    switch (operator) {
        case '+':
            return var1+var2;
        case '-':
            return var1-var2;
        case '*':
            return var1*var2;
        case '/':
            return var1/var2;
        case '^':
            return Math.pow(var1,var2);
    }
}
function eval(p_exp){
    let stack=[];
    let var1,var2;
    for (let i = 0; i < p_exp.length; i++) {
        if(typeof(p_exp[i])==='number')
        stack.push(p_exp[i]);
        else{
            var1=stack.pop();
            var2=stack.pop();
            stack.push(operate(var2,p_exp[i],var1));
        }
    }
    return stack.pop();
}
function evaluate(exp){
    return eval(postfix(break_into_tokens(exp)));
}
document.getElementById('eval_form').addEventListener('submit',function(e){
    e.preventDefault();
    let cal_val=evaluate(document.getElementById('exp').value);
    document.getElementById('result').value=cal_val!=null?cal_val:"Please provide a valid expression!";
})
function handleKeyInputs(e) {
    document.getElementById('exp').value+=e.getAttribute('data-key-value');
}
document.getElementById('backspace_btn').addEventListener('click',function(){
    if(document.getElementById('exp').value!="")
    document.getElementById('exp').value=document.getElementById('exp').value.slice(0,-1);
})