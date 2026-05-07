import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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"
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'test' }],
      max_tokens: 10,
    });
    console.log("SUCCESS:", response.choices[0].message.content);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
