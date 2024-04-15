class Api::CommentsController < ApplicationController

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
  def comment_params
    params.require(:comment).permit(:content)
  end
end
