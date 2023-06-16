import './ReviewCard.css';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import reviewDateFormatter from '../../utils/reviewDateFormatter';

function ReviewCard({ review, user, spotid }) {
    let formattedReviewDate;
    if (review?.createdAt) formattedReviewDate = reviewDateFormatter(review.createdAt);
    else formattedReviewDate = '';

    return (
            <div className='reviewCard'>
                <h3>{review?.User.firstName}</h3>
                <h4>{formattedReviewDate}</h4>
                <p>{review?.review}</p>
                {
                    user?.id === review.User.id
                        ?
                    <OpenModalButton
                        modalComponent={<DeleteReviewModal reviewid={review?.id} spotid={spotid} />}
                        buttonText={'Delete'}
                        className={'secondary-button'}
                        id={'drb'}
                    />
                        :
                    ''
                }
            </div>
    );
};

export default ReviewCard;
