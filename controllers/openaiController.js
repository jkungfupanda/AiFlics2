const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, //configure openai api key from environment variable
});
const openai = new OpenAIApi(configuration); //create a new instance of openai api

const generateImage = async (req, res) => {
  const { prompt, size } = req.body; //destructuring prompt and size from request body

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    //setting the size of the image based on the input size

  try {
    const response = await openai.createImage({
      prompt, //passing the prompt
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url; //extracting image url from the response

    res.status(200).json({
      success: true,
      data: imageUrl, //returning image url
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated', //returning error message if the image generation fails
    });
  }
};

module.exports = { generateImage };