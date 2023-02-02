const { Configuration, OpenAIApi } = require( "openai");


export default async function handler(req, res) {
    const prompt = req.body;
    // console.log(prompt)
    const configuration = new Configuration({
      organization: "org-4tu4inJ5KymAytedgTpWKytx",
      apiKey: process.env.OPENAI_SECRET,
    });
  
    const openai = new OpenAIApi(configuration);
  
    let payload = {
      model:"text-davinci-003",
      prompt,
      temperature:0.4,
      max_tokens: 200,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0,
      stream: false,
      n: 1
    }

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_SECRET ?? ""}`,
        },
        body: JSON.stringify(payload),
    });

    const json = await response.json();
    console.log(json)
  
    
    res.status(200).json(json)
  }
  