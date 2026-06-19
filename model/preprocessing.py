import re

def text_preprocessing(raw_text: str) -> str:
    text=raw_text.strip()
    text = re.sub(r"[ \t]+", " ", text)
    text= re.sub(r'\n+',' ',text)
    text= re.sub(r'\s+',' ',text)
    text= re.sub(r'([?,!]){2,}',r'\1',text)
    text = re.sub(r"\n{3,}", "", text)
    return text
