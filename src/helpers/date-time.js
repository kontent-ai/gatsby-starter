const formatDate = (time) => {
    return new Date(time).toLocaleString('en-US', 
      { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
};

exports.formatDate = formatDate;