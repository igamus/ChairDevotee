import './ReviewCard.css';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';

function ReviewCard({ review, user, spotid }) {
    return (
            <div className='reviewCard'>
                <h3>{review?.User.firstName}</h3>
                <h4>{review?.createdAt}</h4>
                <p>{review?.review}</p>
                {
                    user?.id === review.User.id
                        ?
                    <OpenModalButton
                        modalComponent={<DeleteReviewModal reviewid={review?.id} spotid={spotid} />}
                        buttonText={'Delete'}
                    />
                        :
                    ''
                }
            </div>
    );
};

export default ReviewCard;
