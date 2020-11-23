(function() 
 {
  var allQuestions = [{
    question: "How many possible Quidditch fouls are there?",
    options: ["500","600","700","800"],
    answer: 2
  }, {
    question: "For Harry's 17th birthday, what color did Hermione turn the leaves of the Weasley’s crabapple tree?",
    options: ["Pink","Golden","Silver","Blue"],
    answer: 1
  }, {
    question: "Ginny Weasley bought a pet Pygmy Puff from her older brothers' joke shop. What did she name it?",
    options: ["Arnold", "Groman", "Sabastal","Loeumsi"],
    answer: 0
  },{
    question: "Whose diary did Harry Potter accidently found in the bathroom in the 2nd part “	Chamber of secrets” ?",
    options: ["Hermione Granger", "Neville Longbottom", "Tom Riddles", "Dumbledore"],
    answer: 2
  }, {
    question: "In the 1st part “Philosopher’s stone” Gryffindor beat Slytherin by 10 points. What was the tally in the end?",
    options: ["492-482", "482-472", "472-462", "462-452"],
    answer: 1
  },{
    question: "On the wall across from the Room of Requirement, there is a tapestry showing a wizard trying to teach trolls ballet. What's his name?",
    options: ["Barnabus the Barmy", "Mechanzie the McTesh", "Romanian the Roker", "Zestander the Zuelas"],
    answer: 0
  },{
    question: "Voldemort stole Helga Hufflepuff's cup from an old woman named Hepzibah Smith. What was the name of her house-elf?",
    options: ["Jokey", "Lokey", "Hokey", "Tokey"],
    answer: 2
  },{
    question: "What is Fred Weasley's chosen code name on Potterwatch, the secretive radio program set up by the Order of the Phoenix?",
    options: ["Rapidire", "Rampier", "Rapsier", "Rapier"],
    answer: 3
  },{
    question: "In the Hall of Prophecy there are rows and rows of glowing orbs. Which row contains the prophecy about Harry and Voldemort?",
    options: ["86", "96", "87", "97"],
    answer: 3
  },{
    question: "Name every ingredient contained in Polyjuice Potion.",
    options: ["Lacewing flies, leeches, powdered Bicorn horn, knotgrass, fluxweed, shredded Boomslang skin, and a bit of the person you want to turn into.", "Lacewing flies, leeches, powdered Bicon horn, knotgrass, fluxweed, shredded Boomslang skin, and a bit of the person you want to turn into.", "Lacewing flies, leeches, powdered Bicon horn, knotgrass, fluxweed, shredded Boomslang skin, and a bit of the person you want to turn into.", "Lacewing flies, leeches, powdered Bicorn horn, knotgrass, fluxweed, shreded Boomslang skin, and a bit of the person you want to turn into."],
    answer: 0
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();