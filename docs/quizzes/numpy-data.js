// NumPy Quiz Data
window.quizData = window.quizData || {};

window.quizData['numpy'] = {
  id: "numpy",
  title: "NumPy for Climate Data Quiz",
  description: "Test your knowledge of NumPy arrays, operations, and climate data manipulation.",
  questions: [
    {
      question: "What is the main advantage of using NumPy arrays over Python lists?",
      type: "multiple-choice",
      options: [
        "NumPy arrays can store more elements",
        "NumPy arrays are faster and more memory-efficient",
        "NumPy arrays can only store numbers",
        "NumPy arrays are easier to create"
      ],
      correctAnswer: 1,
      explanation: "NumPy arrays are implemented in C and optimized for numerical operations, making them significantly faster and more memory-efficient than Python lists.",
      hint: "Think about performance and efficiency."
    },
    {
      question: "What will be the shape of the resulting array?",
      type: "multiple-choice",
      code: "import numpy as np\narr = np.arange(12).reshape(3, 4)\nresult = arr.T\nprint(result.shape)",
      options: [
        "(3, 4)",
        "(4, 3)",
        "(12,)",
        "(1, 12)"
      ],
      correctAnswer: 1,
      explanation: "The .T attribute transposes the array, swapping rows and columns. A (3, 4) array becomes (4, 3).",
      hint: "The .T attribute performs a transpose operation."
    },
    {
      question: "Which operations are element-wise in NumPy?",
      type: "multiple-select",
      options: [
        "Array addition: arr1 + arr2",
        "Array multiplication: arr1 * arr2",
        "Array division: arr1 / arr2",
        "Matrix multiplication: arr1 @ arr2"
      ],
      correctAnswer: [0, 1, 2],
      explanation: "Addition, multiplication, and division are element-wise. The @ operator performs matrix multiplication, not element-wise multiplication.",
      hint: "Think about which operations work element-by-element vs. matrix operations."
    },
    {
      question: "NumPy arrays can store elements of different data types (like integers and strings together).",
      type: "true-false",
      correctAnswer: "false",
      explanation: "NumPy arrays are homogeneous - all elements must be of the same data type. This allows for efficient storage and computation.",
      hint: "Think about NumPy's efficiency and how it stores data."
    },
    {
      question: "What does broadcasting allow you to do in NumPy?",
      type: "multiple-choice",
      options: [
        "Send data over a network",
        "Perform operations on arrays of different shapes",
        "Convert arrays to lists",
        "Create random arrays"
      ],
      correctAnswer: 1,
      explanation: "Broadcasting is NumPy's ability to perform operations on arrays of different shapes by automatically expanding smaller arrays.",
      hint: "Think about how NumPy handles arrays of different sizes in operations."
    },
    {
      question: "For climate data analysis, which NumPy functions are commonly used?",
      type: "multiple-select",
      options: [
        "np.mean() - calculate average temperature",
        "np.std() - calculate variability",
        "np.where() - filter data by conditions",
        "np.sort() - always needed for time series"
      ],
      correctAnswer: [0, 1, 2],
      explanation: "mean(), std(), and where() are essential for climate analysis. While sort() can be useful, it's not always needed for time series which are often already chronological."
    },
    {
      question: "What is the result of this masking operation?",
      type: "multiple-choice",
      code: "import numpy as np\ntemps = np.array([15, 22, 18, 30, 25])\nhot_days = temps[temps > 20]\nprint(len(hot_days))",
      options: [
        "2",
        "3",
        "4",
        "5"
      ],
      correctAnswer: 1,
      explanation: "Boolean indexing filters the array. Temperatures > 20 are: 22, 30, and 25. That's 3 elements.",
      hint: "Count how many values are greater than 20."
    },
    {
      question: "The np.nan value is used to represent missing data in NumPy arrays.",
      type: "true-false",
      correctAnswer: "true",
      explanation: "np.nan (Not a Number) is the standard way to represent missing or undefined values in NumPy arrays, especially for floating-point data.",
      hint: "Think about how NumPy handles missing climate data."
    },
    {
      question: "Which function would you use to calculate monthly mean temperature from daily data?",
      type: "multiple-choice",
      options: [
        "np.sum()",
        "np.average()",
        "np.reshape()",
        "np.mean() with proper indexing"
      ],
      correctAnswer: 3,
      explanation: "np.mean() with proper indexing or reshaping allows you to calculate means over specific time periods. You'd group days by month and calculate mean for each group.",
      hint: "You need to calculate an average over specific groups."
    },
    {
      question: "Which statements about NumPy axes are correct?",
      type: "multiple-select",
      options: [
        "axis=0 operates along rows (vertically)",
        "axis=1 operates along columns (horizontally)",
        "axis=-1 refers to the last axis",
        "You can operate along multiple axes simultaneously"
      ],
      correctAnswer: [0, 1, 2, 3],
      explanation: "All statements are correct! axis=0 is rows, axis=1 is columns, axis=-1 is the last axis, and you can use tuples like axis=(0,1) for multiple axes.",
      hint: "All of these statements are actually correct!"
    }
  ]
};

