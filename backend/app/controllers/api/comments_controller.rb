class Api::CommentsController < ApplicationController
  #  before_action :set_comment, only: %i[ show ]

   def index 
    @comment = Comment.where(feature_id: params[:feature_id])

    render json: @comment
  end

  def create
    @feature = Feature.find(params[:feature_id])
    @comment = @feature.comments.build(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  private
  def set_comment
    @comment = Comment.find(params[:feature_id])
  end
  def comment_params
    params.require(:comment).permit(:content)
  end
end
