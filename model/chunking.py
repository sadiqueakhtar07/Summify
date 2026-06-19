from typing import List
import re

def chunking_text(text: str) -> List[str]:
    if not text:
        return []

    words = text.split()
    total_words = len(words)

    # automatic chunk size
    if total_words <= 1500:
        max_words = 450
    elif total_words <= 5000:
        max_words = 600
    else:
        max_words = 750

    overlap = int(0.05 * max_words)

    # Splitting large text into sentences safely
    sentences = re.split(r'(?<=[.!?])\s+', text)

    chunks = []
    current_chunk = []
    current_length = 0

    for sentence in sentences:
        sentence_words = sentence.split()
        sentence_len = len(sentence_words)

        if current_length + sentence_len > max_words:
            chunks.append(" ".join(current_chunk))

            # Add overlap
            overlap_words = current_chunk[-overlap:] if overlap > 0 else []
            current_chunk = overlap_words.copy()
            current_length = len(current_chunk)

        current_chunk.extend(sentence_words)
        current_length += sentence_len

    # Add last chunk
    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks
