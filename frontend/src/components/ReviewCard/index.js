import './ReviewCard.css';

function ReviewCard({ review }) {
    console.log('review in card: ', review);
    // if (review === null) return;
    return (
            <div className='reviewCard'>
                <h3>{review?.User.firstName}</h3>
                <h4>{review?.createdAt}</h4>
                <p>{review?.review}</p>
            </div>
    );
};

export default ReviewCard;
