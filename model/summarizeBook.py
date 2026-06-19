from preprocessing import text_preprocessing
from chunking import chunking_text
from transformersPipeline import summarize_chunks, summarizer, calculate_lengths


def summarize_book(book_text: str, summary_type: str="default") -> str:
    clean_text = text_preprocessing(book_text)
    print("Cleaned Raw Data: ")
    print(clean_text)

    if not clean_text:
        return "No text provided to summarize"
    total_words = len(clean_text.split())

    #directly return summary if length is small
    if total_words<400:
        # max_len, min_len = calculate_lengths(total_words, summary_type)
        # summary = summarizer(
        #     clean_text,
        #     max_length=max_len,
        #     min_length=min_len,
        #     do_sample=False,
        #     truncation=True
        # )[0]["summary_text"]

        return summarize_chunks([clean_text], summary_type)[0]


    chunks = chunking_text(clean_text)
    print(f"\nTotal Chunks: {len(chunks)}")
    for i, chunk in enumerate(chunks, start=1):
        print(f"\nChunk {i}:\n{chunk}")

    chunk_summaries = summarize_chunks(chunks, summary_type)
    print("\n\nSummary of each Chunk:\n")
    for i, summary in enumerate(chunk_summaries, start=1):
        print(f"Summary {i}:")
        print(summary)
        print()

    final_summary = " ".join(chunk_summaries).strip()


    print("Final Summary:")
    return final_summary
