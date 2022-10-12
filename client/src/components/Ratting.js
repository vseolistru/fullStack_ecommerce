import React from 'react';

const Ratting = ({ratting, numReviews}) => {
    return (
        <div className="ratting">
            <span>
                <i className={
                    ratting > 1
                        ? 'fas fa-star'
                        : ratting >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'}/>
            </span>
            <span>
                <i className={
                    ratting > 2
                        ? 'fas fa-star'
                        : ratting >= 1.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'}/>
            </span>
            <span>
                <i className={
                    ratting > 3
                        ? 'fas fa-star'
                        : ratting >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'}/>
            </span>
            <span>
                <i className={
                    ratting > 4
                        ? 'fas fa-star'
                        : ratting >= 3.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'}/>
            </span>
            <span>
                <i className={
                    ratting > 5
                        ? 'fas fa-star'
                        : ratting >= 4.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'}/>
            </span>
            <span>
                <i className={
                    ratting > 6
                        ? 'fas fa-star'
                        : ratting >= 5.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'}/>
            </span>
            <span>
                <i className={
                    ratting > 7
                        ? 'fas fa-star'
                        : ratting >= 7.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'}/>
            </span>
            <div><span>{numReviews} reviews</span></div>
        </div>
    );
};

export default Ratting;