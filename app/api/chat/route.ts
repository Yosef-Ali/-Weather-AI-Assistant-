import OpenAI from 'openai';
import { StreamingTextResponse, OpenAIStream } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const openai = new OpenAI({
//   apiKey: process.env.X_AI_API_KEY || '',
//   baseURL: 'https://api.x.ai/v1'
// });


export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    //model: 'grok-beta',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are a helpful weather assistant. You provide weather information and forecasts in a friendly, conversational manner. 
        When users ask about weather, respond as if you have access to real-time weather data, but always mention that this is a demo.
        Include emoji where appropriate to make the conversation more engaging.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';

// // Initialize X.AI client
// const openai = new OpenAI({
//   apiKey: process.env.X_AI_API_KEY || '',
//   baseURL: 'https://api.x.ai/v1'
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     // Validate API key
//     if (!process.env.X_AI_API_KEY) {
//       throw new Error('X.AI API key not configured');
//     }

//     const { messages } = await req.json();

//     const response = await openai.chat.completions.create({
//       model: 'grok-beta', // Updated model name
//       stream: true,
//       messages: [
//         {
//           role: 'system',
//           content: `You are a helpful weather assistant. You provide weather information and forecasts in a friendly, conversational manner. 
//           When users ask about weather, respond as if you have access to real-time weather data, but always mention that this is a demo.
//           Include emoji where appropriate to make the conversation more engaging.`,
//         },
//         ...messages,
//       ],
//     });

//     console.log(response);

//     const stream = OpenAIStream(response);
//     return new StreamingTextResponse(stream);

//   } catch (error: any) {
//     return new Response(
//       JSON.stringify({
//         error: {
//           message: error.message || 'An error occurred',
//           code: error.code || 'UNKNOWN_ERROR'
//         }
//       }),
//       {
//         status: error.status || 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }