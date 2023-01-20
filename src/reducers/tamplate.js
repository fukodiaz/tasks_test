const addAnswerToComment = (item, idActiveComment, comment) => {
	const {id, comments=[]} = item;

	if (comments.length) {
		comments.map(answer => addAnswerToComment(answer, idActiveComment, comment));
	}
	
	if (id === idActiveComment) {
		if (item?.comments?.length) {
			return {...item, comments: [...item?.comments, comment]};
		} else {
			return {...item, comments: [comment]};
		}
	}
};

const addAnswerToComment_2 = (data, idActiveComment, comment) => {
	return data.reduce((sum, cur) => {
		if (cur.id !== idActiveComment) {
			if (cur?.comments?.length) {
				sum.push({...cur, comments: addAnswerToComment(cur.comments, idActiveComment, comment)})
			} else {
				sum.push({...cur})
			}
			return sum;
		} else {
			if (cur?.comments?.length) {
				sum.push({...cur, comments: [...cur.comments, comment]})
			} else {
				sum.push({...cur, comments: [comment]})
			}
			return sum;
		}
	}, []);
};