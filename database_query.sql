CREATE DATABASE onlinenewspaper;

USE onlinenewspaper;

-- Bảng users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    dob DATE,
    user_role ENUM('writer', 'editor', 'admin', 'reader') DEFAULT 'reader',
    is_active BOOLEAN DEFAULT TRUE,
    subscription_expired_date DATE,
    premium BOOLEAN DEFAULT FALSE
);

-- Bảng categories
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT,
    belong_to INT,
    FOREIGN KEY (belong_to) REFERENCES categories (category_id)
);

-- Bảng articles
CREATE TABLE articles (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    abstract TEXT,
    thumbnail VARCHAR(255),
    views INT DEFAULT 0,
    status ENUM('draft', 'published', 'archived', 'waiting', 'need changes') DEFAULT 'draft',
    published_date DATE,
    is_premium BOOLEAN DEFAULT FALSE,
    writer_id INT,
    category_id INT,
    editor_id INT,
    FOREIGN KEY (writer_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (editor_id) REFERENCES users(user_id)
);

-- Bảng tags
CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

-- Bảng comments
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    article_id INT,
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Bảng notifications
CREATE TABLE notifications (
    not_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    note_content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

-- Bảng approvalhistories
CREATE TABLE approvalhistories (
    approval_id INT AUTO_INCREMENT PRIMARY KEY,
    editor_id INT,
    approval_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    note_content TEXT,
    article_id INT,
    FOREIGN KEY (editor_id) REFERENCES users(user_id),
    FOREIGN KEY (article_id) REFERENCES articles(article_id)
);

-- Liên kết articles với tags (N-N)
CREATE TABLE articletags (
    article_id INT,
    tag_id INT,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

ALTER TABLE users ADD managed_category_id INT;
ALTER TABLE users ADD FOREIGN KEY (managed_category_id) REFERENCES categories(category_id);

-- Phake data
USE onlinenewspaper;

-- Insert users
INSERT INTO users (username, password, email, full_name, dob, user_role, is_active, subscription_expired_date, premium)
VALUES
    ('writer1', 'password123', 'writer1@example.com', 'John Doe', '1985-06-15', 'writer', TRUE, '2025-12-31', FALSE),
    ('editor1', 'password123', 'editor1@example.com', 'Jane Smith', '1978-03-22', 'editor', TRUE, NULL, FALSE),
    ('admin1', 'password123', 'admin1@example.com', 'Admin User', '1990-01-01', 'admin', TRUE, NULL, FALSE),
    ('reader1', 'password123', 'reader1@example.com', 'Mike Johnson', '2000-07-11', 'reader', TRUE, '2024-06-01', TRUE),
    ('reader2', 'password123', 'reader2@example.com', 'Sarah Lee', '1992-11-20', 'reader', TRUE, NULL, FALSE);

-- Insert categories
INSERT INTO categories (category_name, description, belong_to) VALUES
('Thời sự', 'Chuyên mục thời sự', NULL),
('Kinh tế', 'Chuyên mục kinh tế', NULL),
('Thể thao', 'Chuyên mục thể thao', NULL),
('Giải trí', 'Chuyên mục giải trí', NULL),
('Đời sống', 'Chuyên mục đời sống', NULL),
('Công nghệ', 'Chuyên mục công nghệ', NULL),
('Du lịch', 'Chuyên mục du lịch', NULL),
('Giáo dục', 'Chuyên mục giáo dục', NULL),
('Xe', 'Chuyên mục xe', NULL),
('Thế giới', 'Chuyên mục thế giới', NULL),
('Bất động sản', 'Chuyên mục bất động sản', NULL),
('Kinh doanh', 'Chuyên mục kinh doanh', NULL),
-- Thời sự
('Chính trị', 'Chuyên mục chính trị', 1),
('Xã hội', 'Chuyên mục xã hội', 1),
('Pháp luật', 'Chuyên mục pháp luật', 1),
-- Kinh tế
('Tài chính', 'Chuyên mục tài chính', 2),
('Bất động sản', 'Chuyên mục bất động sản', 2),
('Doanh nghiệp', 'Chuyên mục doanh nghiệp', 2),
-- Thể thao
('Bóng đá Việt Nam', 'Chuyên mục bóng đá Việt Nam', 3),
('Bóng đá quốc tế', 'Chuyên mục bóng đá quốc tế', 3),
('Chuyển nhượng', 'Chuyên mục chuyển nhượng', 3),
-- Giải trí
('Sao Việt', 'Chuyên mục sao Việt', 4),
('Âm nhạc', 'Chuyên mục âm nhạc', 4),
('Điện ảnh', 'Chuyên mục điện ảnh', 4),
-- Đời sống
('Sức khỏe', 'Chuyên mục sức khỏe', 5),
('Ẩm thực', 'Chuyên mục ẩm thực', 5),
('Làm đẹp', 'Chuyên mục làm đẹp', 5),
-- Công nghệ
('Điện thoại', 'Chuyên mục điện thoại', 6),
('Internet', 'Chuyên mục internet', 6),
('Games', 'Chuyên mục games', 6),
-- Du lịch
('Điểm đến', 'Chuyên mục điểm đến', 7),
('Ẩm thực', 'Chuyên mục ẩm thực', 7),
('Kinh nghiệm', 'Chuyên mục kinh nghiệm', 7),
-- Giáo dục
('Tuyển sinh', 'Chuyên mục tuyển sinh', 8),
('Du học', 'Chuyên mục du học', 8),
('Học tiếng Anh', 'Chuyên mục học tiếng Anh', 8),
-- Xe
('Thị trường xe', 'Chuyên mục thị trường xe', 9),
('Đánh giá xe', 'Chuyên mục đánh giá xe', 9),
('Ô tô', 'Chuyên mục ô tô', 9),
-- Thế giới
('Quân sự', 'Chuyên mục quân sự', 10),
('Người Việt 5 châu', 'Chuyên mục người Việt 5 châu', 10),
('Chính trị thế giới', 'Chuyên mục chính trị thế giới', 10),
-- Bất động sản
('Dự án', 'Chuyên mục dự án', 11),
('Thị trường', 'Chuyên mục thị trường', 11),
('Nhà đất cho thuê', 'Chuyên mục nhà đất cho thuê', 11),
-- Kinh doanh
('Khởi nghiệp', 'Chuyên mục khởi nghiệp', 12),
('Chứng khoán', 'Chuyên mục chứng khoán', 12),
('Doanh nhân', 'Chuyên mục doanh nhân', 12);

-- Insert articles
INSERT INTO articles (title, content, abstract, thumbnail, views, status, published_date, is_premium, writer_id, category_id, editor_id)
VALUES
    ('Xu hướng công nghệ 2024', 'Nội dung bài viết về xu hướng công nghệ năm 2024...', 'Xu hướng công nghệ nổi bật năm 2024', 'tech2024.jpg', 1200, 'published', '2024-12-01', TRUE, 1, 6, 2),
    ('Tình hình kinh tế Việt Nam', 'Phân tích tình hình kinh tế Việt Nam 2024...', 'Tóm tắt tình hình kinh tế trong năm 2024', 'economy2024.jpg', 850, 'published', '2024-12-10', FALSE, 1, 2, 2),
    ('Đời sống người dân vùng cao', 'Câu chuyện đời sống vùng cao...', 'Khám phá cuộc sống vùng cao', 'highland.jpg', 500, 'draft', NULL, FALSE, 1, 5, NULL),
    ('Chuyển nhượng bóng đá mùa đông', 'Các thương vụ chuyển nhượng đáng chú ý...', 'Thị trường chuyển nhượng mùa đông', 'football.jpg', 950, 'published', '2024-12-05', FALSE, 1, 3, 2),
    ('Ẩm thực đường phố Hà Nội', 'Những món ăn đặc sắc của Hà Nội...', 'Trải nghiệm ẩm thực đường phố tại Hà Nội', 'streetfood.jpg', 300, 'published', '2024-11-25', FALSE, 1, 5, 2);

-- Insert tags
INSERT INTO tags (tag_name) VALUES
    ('Công nghệ'),
    ('Kinh tế'),
    ('Đời sống'),
    ('Thể thao'),
    ('Ẩm thực'),
    ('Du lịch'),
    ('Giáo dục'),
    ('Xe cộ');

-- Link articles with tags
INSERT INTO articletags (article_id, tag_id) VALUES
    (1, 1), -- Công nghệ cho bài "Xu hướng công nghệ 2024"
    (2, 2), -- Kinh tế cho bài "Tình hình kinh tế Việt Nam"
    (3, 3), -- Đời sống cho bài "Đời sống người dân vùng cao"
    (4, 4), -- Thể thao cho bài "Chuyển nhượng bóng đá mùa đông"
    (5, 5); -- Ẩm thực cho bài "Ẩm thực đường phố Hà Nội"

-- Insert comments
INSERT INTO comments (content, article_id, user_id) VALUES
    ('Bài viết rất hay và hữu ích!', 1, 4),
    ('Tôi đồng ý với quan điểm trong bài này.', 2, 4),
    ('Chưa thấy đủ chi tiết, mong bài viết được mở rộng hơn.', 3, 5),
    ('Thông tin rất thú vị, cảm ơn tác giả.', 5, 4),
    ('Cần thêm hình ảnh minh họa cho bài viết.', 4, 5);

-- Insert notifications
INSERT INTO notifications (sender_id, receiver_id, note_content) VALUES
    (3, 2, 'Vui lòng duyệt bài viết mới: "Đời sống người dân vùng cao".'),
    (2, 1, 'Bài viết "Tình hình kinh tế Việt Nam" đã được duyệt và đăng tải.'),
    (3, 4, 'Hãy kiểm tra bình luận của bạn trên bài viết "Xu hướng công nghệ 2024".');

-- Insert Approval Histories
INSERT INTO approvalhistories (editor_id, approval_date, note_content, article_id) VALUES
    (2, '2024-12-01 10:30:00', 'Bài viết đã hoàn thiện và sẵn sàng đăng.', 1),
    (2, '2024-12-10 15:45:00', 'Phân tích sâu sắc, bài viết đạt yêu cầu.', 2),
    (2, '2024-12-05 09:20:00', 'Cần chú ý hơn vào hình ảnh minh họa.', 4);


-- Insert Additional articles
INSERT INTO articles (title, content, abstract, thumbnail, views, status, published_date, is_premium, writer_id, category_id, editor_id)
VALUES
    ('Vinfast mở rộng thị trường Bắc Mỹ', 'Chi tiết về kế hoạch mở rộng của Vinfast...', 'Vinfast tiếp tục chiến lược toàn cầu hóa', 'vinfast_expansion.jpg', 3500, 'published', '2024-12-15', TRUE, 1, 9, 2),
    ('Top 10 điểm du lịch hot nhất 2024', 'Khám phá những điểm đến hấp dẫn...', 'Những địa điểm du lịch không thể bỏ qua', 'tourism2024.jpg', 2800, 'published', '2024-12-14', FALSE, 1, 7, 2),
    ('Làn sóng AI trong giáo dục Việt Nam', 'Tác động của AI đến giáo dục...', 'AI đang thay đổi cách dạy và học', 'ai_education.jpg', 4200, 'published', '2024-12-13', TRUE, 1, 8, 2),
    ('Chứng khoán 2024: Năm của cơ hội?', 'Phân tích thị trường chứng khoán...', 'Dự báo và cơ hội đầu tư', 'stock_market.jpg', 5100, 'published', '2024-12-12', TRUE, 1, 12, 2),
    ('Top smartphone đáng mua nhất 2024', 'Đánh giá chi tiết các mẫu điện thoại...', 'Hướng dẫn chọn mua smartphone', 'smartphones.jpg', 6300, 'published', '2024-12-11', FALSE, 1, 6, 2),
    ('Bão số 5 đổ bộ miền Trung', 'Tình hình thiệt hại và công tác cứu hộ...', 'Ảnh hưởng của bão số 5', 'storm.jpg', 4800, 'published', '2024-12-10', FALSE, 1, 1, 2),
    ('Champions League: Kết quả bất ngờ', 'Tường thuật các trận đấu quan trọng...', 'Những bất ngờ tại Champions League', 'champions_league.jpg', 3900, 'published', '2024-12-09', FALSE, 1, 3, 2),
    ('Xu hướng thời trang xuân 2025', 'Các xu hướng thời trang mới nhất...', 'Dự báo thời trang mùa xuân', 'fashion2025.jpg', 2700, 'published', '2024-12-08', TRUE, 1, 5, 2),
    ('Phát triển năng lượng sạch', 'Tiến độ các dự án năng lượng tái tạo...', 'Chuyển đổi năng lượng xanh', 'clean_energy.jpg', 3100, 'published', '2024-12-07', FALSE, 1, 2, 2),
    ('Game Việt Nam gây tiếng vang', 'Thành công của ngành game Việt...', 'Game Việt chinh phục thị trường quốc tế', 'viet_games.jpg', 4500, 'published', '2024-12-06', FALSE, 1, 6, 2),
    ('Nghề hot trong kỷ nguyên AI', 'Các nghề nghiệp tiềm năng...', 'Định hướng nghề nghiệp tương lai', 'ai_jobs.jpg', 5200, 'published', '2024-12-05', TRUE, 1, 8, 2),
    ('Khủng hoảng năng lượng châu Âu', 'Tình hình năng lượng tại châu Âu...', 'Thách thức năng lượng toàn cầu', 'energy_crisis.jpg', 3400, 'published', '2024-12-04', FALSE, 1, 10, 2),
    ('Street food Sài Gòn về đêm', 'Khám phá ẩm thực đường phố...', 'Văn hóa ẩm thực Sài Gòn', 'saigon_food.jpg', 2900, 'published', '2024-12-03', FALSE, 1, 5, 2),
    ('Startup Việt gọi vốn thành công', 'Làn sóng đầu tư vào startup Việt...', 'Tiềm năng startup Việt Nam', 'startup_funding.jpg', 4100, 'published', '2024-12-02', TRUE, 1, 12, 2),
    ('Đột phá trong điều trị ung thư', 'Phương pháp điều trị mới...', 'Tiến bộ y học đáng chú ý', 'cancer_treatment.jpg', 6100, 'published', '2024-12-01', TRUE, 1, 5, 2),
    ('Thị trường BĐS phía Nam', 'Phân tích thị trường BĐS...', 'Triển vọng BĐS khu vực phía Nam', 'real_estate.jpg', 3800, 'published', '2024-11-30', FALSE, 1, 11, 2),
    ('Kỹ năng sinh tồn trong tự nhiên', 'Hướng dẫn kỹ năng sinh tồn...', 'Sinh tồn trong môi trường hoang dã', 'survival_skills.jpg', 2600, 'published', '2024-11-29', FALSE, 1, 7, 2),
    ('Làng nghề truyền thống đổi mới', 'Câu chuyện về các làng nghề...', 'Giữ gìn và phát triển làng nghề', 'traditional_craft.jpg', 3200, 'published', '2024-11-28', FALSE, 1, 1, 2),
    ('Công nghệ blockchain trong ngân hàng', 'Ứng dụng blockchain...', 'Chuyển đổi số ngành ngân hàng', 'blockchain_banking.jpg', 4700, 'published', '2024-11-27', TRUE, 1, 6, 2),
    ('Review Mercedes EQS 2024', 'Đánh giá chi tiết Mercedes EQS...', 'Trải nghiệm xe điện hạng sang', 'mercedes_eqs.jpg', 5500, 'published', '2024-11-26', TRUE, 1, 9, 2),
    ('Phim Việt thắng giải quốc tế', 'Thành công của điện ảnh Việt...', 'Điện ảnh Việt Nam vươn tầm thế giới', 'viet_film.jpg', 3600, 'published', '2024-11-25', FALSE, 1, 4, 2),
    ('Chuyển đổi số trong nông nghiệp', 'Ứng dụng công nghệ trong nông nghiệp...', 'Nông nghiệp thông minh 4.0', 'smart_agriculture.jpg', 3000, 'published', '2024-11-24', FALSE, 1, 2, 2),
    ('Giải pháp cho ô nhiễm không khí', 'Các biện pháp giảm ô nhiễm...', 'Môi trường và sức khỏe cộng đồng', 'air_pollution.jpg', 4300, 'published', '2024-11-23', FALSE, 1, 1, 2),
    ('Xu hướng marketing 2025', 'Chiến lược marketing mới...', 'Định hướng marketing tương lai', 'marketing2025.jpg', 5300, 'published', '2024-11-22', TRUE, 1, 12, 2),
    ('Du học sinh Việt tại Mỹ', 'Cuộc sống du học sinh...', 'Hành trình du học tại Mỹ', 'vietnamese_students.jpg', 3300, 'published', '2024-11-21', FALSE, 1, 8, 2),
    ('Triển lãm nghệ thuật số', 'Khám phá nghệ thuật kỹ thuật số...', 'Nghệ thuật trong kỷ nguyên số', 'digital_art.jpg', 2500, 'published', '2024-11-20', FALSE, 1, 4, 2),
    ('Thành phố thông minh tại Việt Nam', 'Phát triển đô thị thông minh...', 'Tương lai của đô thị Việt Nam', 'smart_city.jpg', 4600, 'published', '2024-11-19', TRUE, 1, 1, 2),
    ('Ứng dụng IoT trong y tế', 'Công nghệ IoT trong chăm sóc sức khỏe...', 'Chuyển đổi số ngành y tế', 'healthcare_iot.jpg', 5400, 'published', '2024-11-18', TRUE, 1, 6, 2),
    ('Bảo tồn di sản văn hóa', 'Nỗ lực bảo tồn di sản...', 'Giữ gìn bản sắc văn hóa', 'cultural_heritage.jpg', 3700, 'published', '2024-11-17', FALSE, 1, 5, 2),
    ('Khởi nghiệp từ làng quê', 'Câu chuyện khởi nghiệp nông thôn...', 'Phát triển kinh tế nông thôn', 'rural_startup.jpg', 2800, 'published', '2024-11-16', FALSE, 1, 12, 2);

INSERT INTO articletags (article_id, tag_id)
SELECT 
    a.article_id,
    CASE
        WHEN a.category_id IN (6, 8) THEN 1  -- Công nghệ
        WHEN a.category_id IN (2, 12) THEN 2 -- Kinh tế
        WHEN a.category_id = 5 THEN 3        -- Đời sống
        WHEN a.category_id = 3 THEN 4        -- Thể thao
        WHEN a.category_id = 7 THEN 6        -- Du lịch
        WHEN a.category_id = 8 THEN 7        -- Giáo dục
        WHEN a.category_id = 9 THEN 8        -- Xe cộ
        ELSE 1                               -- Default to Công nghệ
    END AS tag_id
FROM articles a
WHERE a.article_id > 5
AND NOT EXISTS (
    SELECT 1 
    FROM articletags at 
    WHERE at.article_id = a.article_id
      AND at.tag_id = CASE
          WHEN a.category_id IN (6, 8) THEN 1
          WHEN a.category_id IN (2, 12) THEN 2
          WHEN a.category_id = 5 THEN 3
          WHEN a.category_id = 3 THEN 4
          WHEN a.category_id = 7 THEN 6
          WHEN a.category_id = 8 THEN 7
          WHEN a.category_id = 9 THEN 8
          ELSE 1
      END
);

ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NULL;
ALTER TABLE users 
ADD COLUMN oauth_provider VARCHAR(20) NULL,
ADD COLUMN oauth_id VARCHAR(100) NULL;