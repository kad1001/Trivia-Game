$("#s1000").click(function() {
    $(".container").replaceWith($(".questions"));
})



























// {buttons
//     "$ 1000" value = 1000, function onclick -> $grid -> easy science question + input box + countdown from 5 seconds
//     "$ 2000" value=2000, function onclick -> $grid -> med science question + input box + countdown
//     "$ 3000" value=3000, function onclick -> $grid -> hard science question + input + countdown
// }

// {buttons
//     "$ 1000" value = 1000, function onclick -> $grid -> easy computer question + input box + countdown from 5 seconds
//     "$ 2000" value = 2000, function onclick -> $grid -> med computer question + input box + countdown
//     "$ 3000" value = 3000, function onclick -> $grid -> hard computer question + input + countdown
// }
// {buttons
//     "$ 1000" value = 1000,function onclick -> $grid -> easy Entertainment question + input box + countdown from 5 seconds
//     "$ 2000" value = 2000,function onclick -> $grid -> med Entertainment question + input box + countdown
//     "$ 3000" value = 3000, function onclick -> $grid -> hard Entertainment question + input + countdown
// }

// *if user does not click button in 5 seconds, will alert ("you ran out of time") and location.reload
// *if user enters correct response, alert("you are correct! you have collected" + money)
// *if user enters correct response, record money value into "money" array, which stores the sum of the values of each correct guess





// // #valueSum
// function sumAll() {
//     var i;
//     var sum = 0;
//     for(i = 0; i < arguments.length; i++) {
//       sum += arguments[i];
//     }
//     return sum;
//   }
//   document.getElementById("demo").innerHTML = sumAll(1, 123, 500, 115, 44, 88);