import { Configuration, OpenAIApi } from "openai";
import * as core from "@actions/core";
import { parseCommit } from "./commits";

export async function run(): Promise<void> {
  try {
    const apiKey = core.getInput("openai-api-key");
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);

    core.debug(`openai-prompt: ${core.getInput("openai-prompt")}`);

    const response = await openai.createCompletion({
      model: core.getInput("model"),
      prompt: parseCommit(core.getInput("openai-prompt")),
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const text = response.data.choices[0].text ?? "";

    // core.debug(`openai-response: ${text}`);

    // The output of this action is the body of the tweet
    core.setOutput('text', text);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
