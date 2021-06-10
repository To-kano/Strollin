

export default async (req, res) => {
    console.log("body ", req.body);
    console.log("method ", req.method);

        let result = await fetch(`http://88.165.45.219:3000/faq/get_question_en`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'GET',
          });
          
          result = await  result.json();
          console.log("faqData = ",result["faqs_list"]);
          res.status(200).json(result["faqs_list"]); 


//    res.status(200).json({ name: 'my answer LOL' })
}
  