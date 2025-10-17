import React from 'react';

export default function ColDetail({ title, data, isFullWidth }) {
    const isImage = (data) => {
        return typeof data === 'string' && (data.startsWith('http') && !data.endsWith('.pdf'));
    };

    return (
        <div className={`col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 ${isFullWidth ? 'full-width' : ''} restaurantDetail pb-4`}>
            <span className="restaurant_heading" style={{ fontWeight: 700 }}>{title}</span>
            <br />
            <span className="restaurant_data">
                {isImage(data) ? (
                    <img src={data} alt={title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
                ) : (
                    data ? data : data == 0 ? data : 'N/A'
                )}
            </span>
        </div>
    );
}
