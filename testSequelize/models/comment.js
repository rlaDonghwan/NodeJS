const Sequelize = require('sequelize'); // Sequelize 모듈을 가져옴

class Comment extends Sequelize.Model {
    static initate(sequelize) { // 모델 초기화 메서드
        Comment.init({
            comment: {
                type: Sequelize.STRING(100), // 코멘트 필드, 문자열 타입, 최대 길이 100
                allowNull: false, // 필수 필드
            },
            created_at: {
                type: Sequelize.DATE, // 생성일 필드, 날짜 타입
                allowNull: true, // 선택 필드
                defaultValue: Sequelize.NOW, // 기본값은 현재 시간
            },
        }, {
            sequelize, // Sequelize 인스턴스
            timestamps: false, // 타임스탬프 사용 안 함
            underscored: false, // 스네이크 케이스 사용 안 함
            modelName: 'Comment', // 모델 이름
            tableName: 'comments', // 테이블 이름
            paranoid: false, // 삭제된 레코드 보존 안 함
            charset: 'utf8mb4', // 문자셋 설정
            collate: 'utf8mb4_general_ci', // 콜레이션 설정
        });
    }

    static associate(db) { // 관계 설정 메서드
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' }); // Comment 모델이 User 모델과 관계를 가짐
    }
}

module.exports = Comment; // Comment 클래스를 모듈로 내보냄