#!/bin/bash

# Simple Interest Calculator - Bash Script
# This script computes simple interest based on user input
# Formula: Interest = (Principal × Rate × Time) / 100

clear
echo "=========================================="
echo "  SIMPLE INTEREST CALCULATOR (Bash)"
echo "=========================================="
echo ""

# Function to validate numeric input
validate_input() {
    local input=$1
    local field_name=$2
    
    if ! [[ $input =~ ^[0-9]+([.][0-9]{1,2})?$ ]]; then
        echo "Error: Invalid $field_name. Please enter a positive number."
        exit 1
    fi
}

# Get Principal Amount
echo "Enter Principal Amount (in currency units):"
read -p "Principal (P): " principal
validate_input "$principal" "principal"

# Get Rate of Interest
echo ""
echo "Enter Rate of Interest (% per annum):"
read -p "Rate (R): " rate
validate_input "$rate" "rate"

# Get Time Period
echo ""
echo "Enter Time Period (in years):"
read -p "Time (T): " time
validate_input "$time" "time"

# Calculate Simple Interest
interest=$(echo "scale=2; ($principal * $rate * $time) / 100" | bc)
total=$(echo "scale=2; $principal + $interest" | bc)

# Display Results
echo ""
echo "=========================================="
echo "           CALCULATION RESULTS"
echo "=========================================="
echo "Principal Amount (P)    : \$$principal"
echo "Rate of Interest (R)    : $rate% per annum"
echo "Time Period (T)         : $time years"
echo "------------------------------------------"
echo "Simple Interest (I)     : \$$interest"
echo "Total Amount (A)        : \$$total"
echo "=========================================="
echo ""

# Annual Breakdown
echo "ANNUAL BREAKDOWN:"
echo "------------------------------------------"
per_year_interest=$(echo "scale=2; ($principal * $rate) / 100" | bc)
years=$(echo "$time" | cut -d. -f1)
remainder=$(echo "$time - $years" | bc)

running_total=$principal

for ((year = 1; year <= years; year++)); do
    running_total=$(echo "scale=2; $running_total + $per_year_interest" | bc)
    echo "Year $year: Interest = \$$per_year_interest | Total = \$$running_total"
done

if (( $(echo "$remainder > 0" | bc -l) )); then
    last_interest=$(echo "scale=2; $per_year_interest * $remainder" | bc)
    final_total=$(echo "scale=2; $running_total + $last_interest" | bc)
    echo "Year $time: Interest = \$$last_interest | Total = \$$final_total"
fi

echo "=========================================="
echo ""
echo "Calculation completed successfully!"
echo ""
