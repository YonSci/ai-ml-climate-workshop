// Python Basics Quiz Data
window.quizData = window.quizData || {};

window.quizData['python-basics'] = {
  id: "python-basics",
  title: "Python Fundamentals Quiz",
  description: "Test your understanding of Python basics: variables, data types, control flow, and functions.",
  questions: [
    {
      question: "What is the correct way to create a list in Python?",
      type: "multiple-choice",
      options: [
        "list = (1, 2, 3)",
        "list = [1, 2, 3]",
        "list = {1, 2, 3}",
        "list = <1, 2, 3>"
      ],
      correctAnswer: 1,
      explanation: "Square brackets [] are used to create lists in Python. Parentheses () create tuples, curly braces {} create sets or dictionaries.",
      hint: "Think about the different bracket types in Python data structures."
    },
    {
      question: "Which of the following are mutable data types in Python?",
      type: "multiple-select",
      options: [
        "List",
        "Tuple",
        "Dictionary",
        "String"
      ],
      correctAnswer: [0, 2],
      explanation: "Lists and dictionaries are mutable (can be modified after creation). Tuples and strings are immutable (cannot be changed after creation)."
    },
    {
      question: "What will be the output of the following code?",
      type: "multiple-choice",
      code: "x = [1, 2, 3]\ny = x\ny.append(4)\nprint(len(x))",
      options: [
        "3",
        "4",
        "Error",
        "None"
      ],
      correctAnswer: 1,
      explanation: "Lists are mutable and y = x creates a reference to the same list, not a copy. When we append to y, x is also modified. So len(x) returns 4.",
      hint: "Remember that lists are passed by reference in Python."
    },
    {
      question: "In Python 3, the '/' operator always returns a float, even when dividing two integers.",
      type: "true-false",
      correctAnswer: "true",
      explanation: "In Python 3, the division operator / always performs true division and returns a float. Use // for integer division.",
      hint: "Think about how Python 3 handles division differently from Python 2."
    },
    {
      question: "What is the correct way to define a function that takes a default argument?",
      type: "multiple-choice",
      options: [
        "def greet(name = \"World\"): print(f\"Hello, {name}\")",
        "def greet(name := \"World\"): print(f\"Hello, {name}\")",
        "def greet(name == \"World\"): print(f\"Hello, {name}\")",
        "def greet(name default \"World\"): print(f\"Hello, {name}\")"
      ],
      correctAnswer: 0,
      explanation: "Default arguments are specified using the = operator in the function definition.",
      hint: "Look for the single equals sign, not the walrus operator or comparison operator."
    },
    {
      question: "Which of these statements about Python dictionaries are true?",
      type: "multiple-select",
      options: [
        "Dictionary keys must be immutable",
        "Dictionary values can be any type",
        "Dictionaries maintain insertion order (Python 3.7+)",
        "Dictionaries can have duplicate keys"
      ],
      correctAnswer: [0, 1, 2],
      explanation: "Dictionary keys must be immutable (strings, numbers, tuples). Values can be any type. Since Python 3.7, dictionaries maintain insertion order. Keys must be unique - duplicate keys will overwrite previous values."
    },
    {
      question: "What will this code print?",
      type: "multiple-choice",
      code: "numbers = [1, 2, 3, 4, 5]\nresult = [x**2 for x in numbers if x % 2 == 0]\nprint(result)",
      options: [
        "[1, 4, 9, 16, 25]",
        "[4, 16]",
        "[2, 4]",
        "[1, 9, 25]"
      ],
      correctAnswer: 1,
      explanation: "This is a list comprehension with a filter. It squares only the even numbers: 2²=4 and 4²=16.",
      hint: "The comprehension filters for even numbers (x % 2 == 0) then squares them."
    },
    {
      question: "The 'is' operator checks for value equality, while '==' checks for identity.",
      type: "true-false",
      correctAnswer: "false",
      explanation: "It's the opposite! 'is' checks for identity (same object in memory), while '==' checks for value equality.",
      hint: "Think about what each operator actually compares."
    },
    {
      question: "What is the correct way to handle exceptions in Python?",
      type: "multiple-choice",
      options: [
        "try-except block",
        "catch-throw block",
        "handle-error block",
        "rescue-raise block"
      ],
      correctAnswer: 0,
      explanation: "Python uses try-except blocks for exception handling. 'catch-throw' is used in Java/C++, other options don't exist.",
      hint: "Think about Python's specific syntax for error handling."
    },
    {
      question: "Which of the following are valid ways to create a string in Python?",
      type: "multiple-select",
      options: [
        "s = 'Hello'",
        "s = \"Hello\"",
        "s = '''Hello'''",
        "s = String('Hello')"
      ],
      correctAnswer: [0, 1, 2],
      explanation: "Python allows single quotes ', double quotes \", and triple quotes ''' or \"\"\" for strings. There is no String() constructor like in some other languages."
    }
  ]
};

