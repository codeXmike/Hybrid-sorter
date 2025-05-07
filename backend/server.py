"""CODE GEASS HYBRID SORTER BACKEND

    Author: CodeXMike
"""
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/sort', methods=['POST'])
def sort_array():
    data = request.json
    array = data.get('array', [])
    sorted_array = hybrid_merge_insertion_sort(array)
    return jsonify({'sortedArray': sorted_array})

def insertion_sort(arr, left=0, right=None):
    """Insertion sort for small subarrays"""
    if right is None:
        right = len(arr) - 1
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

def merge(left, right):
    """Merge two sorted lists"""
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

def hybrid_merge_insertion_sort(arr, threshold=32):
    """Hybrid sort using insertion sort for small subarrays"""
    if len(arr) <= threshold:
        return insertion_sort(arr)
    
    mid = len(arr) // 2
    left = hybrid_merge_insertion_sort(arr[:mid], threshold)
    right = hybrid_merge_insertion_sort(arr[mid:], threshold)
    return merge(left, right)

if __name__ == "__main__":
    app.run(debug=True)