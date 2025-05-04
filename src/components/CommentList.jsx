// src/components/CommentList.jsx
import React, { useState } from 'react';

/**
 * ChatMessage
 * Props:
 *  - author: string
 *  - timestamp: string
 *  - text: string
 *  - attachments?: string[]  // array of data-URLs
 *  - onImageClick?: function // function to handle image clicks
 */
function ChatMessage({ author, timestamp, text, attachments, onImageClick }) {
  return (
    <div className="mb-6">
      <div className="text-xs text-gray-500 mb-1">
        <span className="font-semibold text-gray-700">{author}</span>
        <span className="ml-2">{timestamp}</span>
      </div>
      <div className="inline-block bg-gray-100 p-3 rounded-xl max-w-full">
        {text}
      </div>

      {/* Render attachments */}
      {attachments && attachments.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {attachments.map((url, i) => (
            <div key={i} className="relative inline-block">
              {url.startsWith('data:image') ? (
                <img
                  src={url}
                  alt={`attachment-${i}`}
                  className="max-w-xs max-h-48 rounded border cursor-pointer"
                  onClick={() => onImageClick(url)} // Trigger viewer on click
                />
              ) : (
                <a
                  href={url}
                  download
                  className="text-blue-600 underline"
                >
                  Download file {i + 1}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * CommentList
 * Props:
 *  - comments: Array<{ id, author, timestamp, text, attachments?: string[] }>
 *  - onImageClick?: function // function to handle image clicks
 */
export default function CommentList({ comments }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mt-6">
      {comments.map(c => (
        <ChatMessage
          key={c.id}
          author={c.author}
          timestamp={c.timestamp}
          text={c.text}
          attachments={c.attachments}
          onImageClick={handleImageClick} // Pass down image click handler
        />
      ))}

      {/* Modal for image preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img src={selectedImage} alt="Preview" className="max-w-full max-h-screen rounded" />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
