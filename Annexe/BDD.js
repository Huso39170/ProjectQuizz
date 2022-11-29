let quizz = new Schema({
  name: {
    type: String
  },
  desciption:{
    type: String
  },
  questions : [
    {
        question_type : {
            type :Enumerator
        },
        questionDecription : {type : String},
        propositions : [
            {desciption: {type : String}, count : {type :Int }}
        ],
        reponses : [{
            reponse :{type:String}
         }],
    }
  ]
});
