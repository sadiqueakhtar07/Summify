from flask import Flask, request, jsonify
from summarizeBook import summarize_book
app=Flask(__name__)

@app.route('/summarizeBook', methods=["POST"])
def summarize():
    try:
        data = request.get_json(silent=True)

        if not data or "text" not in data:
            return jsonify({"error": "No text provided"}), 400

        raw_text = data.get('text',"").strip()

        if not raw_text.strip():
            return jsonify({"error": "No text provided"}), 400

        raw_text = raw_text[:40000]
        summary_type = data.get('summary_type',"default").lower()
        bookSummary = summarize_book(raw_text, summary_type)
        return jsonify({
            "success": True,
            "summary": bookSummary,
            "summary_type": summary_type
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }),500

if __name__ == "__main__":
    app.run(debug=False, port=5000)
