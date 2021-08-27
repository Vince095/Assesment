window.onload = () =>{
let firstName = document.getElementById('name1').value;
let secondName = document.getElementById('name2').value;
let btn = document.querySelector('button');
let result = document.querySelector('.results')
var percent = 0;

const handleMatches = function(str1, str2){

    if(str1.length == 0 )return str2.length;
    if(str2.length == 0 )return str1.length;
    
    var matrix  = [];

    //increament along the first column of each row
    var i;
    for(i =0; i<= str2.length; i++){
        matrix[i] = [i];
    }

    //increament each column in the firstrow
    var j;
    for(j =0; j<= str1.length; j++){
       matrix[0][j] = j;
   }

   let count = 0;
   let hits = [];
   //check for matches
   for(i = 1; i<= str2.length; i++){
       for(j = 1; j <= str1.length; j++){
            if(str2.charAt(i-1) == str1.charAt(j-1)){
                var sum;
                count++;
                sum =  count + count;
                hits.push(sum);

                matrix[i][j] = matrix[i-1][j-1];
            }else{
                matrix[i][j] = Math.min(matrix[i-1][j-1]+1, //substitution
                    Math.min(matrix[i][j-1]+1 , //insertion 
                        matrix[i-1][j]+1  //deletion
                ));
            }
       }
   }
 
    hits.forEach(num =>{
        
        if(num <= 10){
           percent = (num)*10;
        }
      
    })

    if(percent >= 20){
    result.innerHTML +=` ${percent}"%`;
  }
  if(percent >= 60){
      
    result.innerHTML +="this is a good match";
  }
  
   return matrix[str2.length][str1.length];

};

var name1 = firstName;
var name2 = secondName;

var csvObject =[
    { gender:"m",name:name2},
    {gender:"m",name:"Jack"},
    {gender:"f",name:"Wonder"}
];

function bestMatch(){
    var temp = csvObject.map(function(item){
        item.check = handleMatches(name1, item.name)
        return item;
    })
    
    temp.sort(function(str1, str2){
        if(str1.check < str2.check)return -1;
        else if (str1.check > str2.check)return 1;
        else return 0;

    })
    return temp[0].name
}

//create log file 
fs.appendFile('Logs.txt', 
     `${name1} matches ${bestMatch()} ${percent}% \n `, 
    
    function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

btn.addEventListener('click', evt =>{
    evt.preventDefault();
    result.innerHTML = `${name1}  matches ${bestMatch()}`;
})

}