const { Configuration, OpenAIApi } = require( "openai");


export default async function handler(NextApiRequest, NextApiResponse) {
    const prompt = NextApiRequest.body;
    // console.log(prompt)
    const configuration = new Configuration({
      organization: "org-4tu4inJ5KymAytedgTpWKytx",
      apiKey: process.env.OPENAI_SECRET,
    });
  
    const openai = new OpenAIApi(configuration);
  
    let payload = {
      model:"text-davinci-003",
      prompt,
      temperature: .7,
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

    try {
        const json = await response.json();
        NextApiResponse.status(200).json(json)
    } catch (error) {
        console.log(error)
        NextApiResponse.status(500).send('Internal Server Error.');
    }
    
  }
  
 