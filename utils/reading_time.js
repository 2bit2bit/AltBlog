exports.calcReadingTime = (body) => {
    const wordCount = body.split(" ").length;
    const averageTime = Math.round(wordCount / 200); 
    if (averageTime < 1) {
        return 'less than 1 min'
    } else {
        return `${averageTime} mins`
    }
  }