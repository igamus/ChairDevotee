import './ReviewCard.css';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import reviewDateFormatter from '../../utils/reviewDateFormatter';
import UpdateReviewModal from '../PostReviewModal/UpdateReviewModal';

function ReviewCard({ review, user, source, spot }) {
    let formattedReviewDate;
    if (review?.createdAt) formattedReviewDate = reviewDateFormatter(review.createdAt);
    else formattedReviewDate = '';

    return (
            <div className='review-card'>
                <h3>{source === 'spot' ? review?.User.firstName : review?.Spot.name}</h3>
                <h4 id='review-date' style={{fontSize: '13pt'}}>{formattedReviewDate}</h4>
                <p id='review-text'>{review?.review}</p>
                {
                    (source === 'user' || user?.id === review.User.id)
                        ?
                    <div class='review-buttons-container'>
                        <OpenModalButton
                            modalComponent={<UpdateReviewModal reviewdata={review} className='modal-with-background' source={source} spot={source === 'spot' ? spot : null} />}
                            buttonText={'Update'}
                            className={'secondary-button urb'}
                        />
                        <OpenModalButton
                            modalComponent={<DeleteReviewModal reviewid={review?.id} className='modal-with-background' />}
                            buttonText={'Delete'}
                            className={'secondary-button drb'}
                        />
                    </div>
                        :
                    ''
                }
            </div>
    );
};

export default ReviewCard;
