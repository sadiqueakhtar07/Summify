from transformers import pipeline
import torch

device = 0 if torch.cuda.is_available() else -1

summarizer = pipeline("summarization",
                      model="facebook/bart-large-cnn",
                      device = device)
def calculate_lengths(word_count:int, summary_type: str="default"):
    if summary_type == "short":
        ratio = 0.30
    elif summary_type == "detailed":
        ratio = 0.60
    else:
        ratio = 0.45

    max_len=int(word_count*ratio)
    min_len=int(max_len*0.5)
    # for BART
    max_len = max(60, min(max_len, 250))
    min_len = max(30, min(min_len, max_len - 20))
    return max_len, min_len

def summarize_chunks(chunks, summary_type="default"):
    summaries = []

    for chunk in chunks:
        word_count = len(chunk.split())

        max_len, min_len = calculate_lengths(word_count, summary_type)

        summary = summarizer(
            chunk,
            max_length=max_len,
            min_length=min_len,
            num_beams=2,
            no_repeat_ngram_size=2,
            length_penalty=1.5,
            early_stopping=True,
            do_sample=False,
            truncation=True
        )[0]["summary_text"]

        summaries.append(summary.strip())

    return summaries