from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='static', template_folder='templates')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/compute', methods=['POST'])
def compute():
    # Calcualte the simple interest using the formula: Interest = (P * R * T) / 100
    data = request.get_json() or {}
    try:
        P = float(data.get('principal', 0))
        R = float(data.get('rate', 0))
        T = float(data.get('time', 0))
    except (TypeError, ValueError):
        return jsonify({'error': 'invalid input'}), 400

    interest = (P * R * T) / 100.0
    total = P + interest

    # Provide both raw numbers and formatted strings
    from locale import setlocale, LC_ALL, currency
    try:
        setlocale(LC_ALL, '')
        interest_fmt = currency(interest, grouping=True)
        total_fmt = currency(total, grouping=True)
    except Exception:
        interest_fmt = f"${interest:,.2f}"
        total_fmt = f"${total:,.2f}"

    return jsonify({
        'interest': interest,
        'total': total,
        'interest_fmt': interest_fmt,
        'total_fmt': total_fmt
    })


if __name__ == '__main__':
    app.run(debug=True)
